import React, { useEffect, useRef, useState } from 'react';

const FamilyMediaControls = ({ apiBase, memberToken }) => {
    const videoRef = useRef(null);
    const cameraStream = useRef(null);
    const recorderRef = useRef(null);
    const timerRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [audio, setAudio] = useState(null);
    const [busy, setBusy] = useState('');
    const [status, setStatus] = useState('');

    const stopCamera = () => {
        cameraStream.current?.getTracks().forEach((track) => track.stop());
        cameraStream.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
    };

    useEffect(() => () => {
        clearTimeout(timerRef.current);
        recorderRef.current?.state === 'recording' && recorderRef.current.stop();
        stopCamera();
    }, []);

    const startCamera = async () => {
        setBusy('camera');
        setStatus('');
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('Is browser mein camera support nahi hai.');
            }
            cameraStream.current = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false,
            });
            if (videoRef.current) videoRef.current.srcObject = cameraStream.current;
            setStatus('Camera preview sirf aapke browser mein hai. Photo aapke capture aur upload karne par hi bheji jayegi.');
        } catch (error) {
            setStatus(error.name === 'NotAllowedError' ? 'Camera permission allow nahi hui.' : error.message || 'Camera nahi khul saka.');
        } finally {
            setBusy('');
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        if (!video || !video.videoWidth || !video.videoHeight) {
            setStatus('Camera preview tayyar nahi hai; ek pal baad dobara koshish karein.');
            return;
        }
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 1600 / Math.max(video.videoWidth, video.videoHeight));
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
            if (!blob) {
                setStatus('Photo taiyar nahi ho saki.');
                return;
            }
            setPhoto(blob);
            stopCamera();
            setStatus('Photo taiyar hai. Admin ko bhejne ke liye Upload photo dabayein.');
        }, 'image/jpeg', 0.82);
    };

    const upload = async (kind, blob, fileName) => {
        setBusy(kind);
        setStatus('');
        try {
            const form = new FormData();
            form.append('file', blob, fileName);
            const response = await fetch(`${apiBase}/member/media/${kind}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${memberToken}` },
                body: form,
            });
            const body = await response.json().catch(() => null);
            if (!response.ok) throw new Error(body?.error || `Upload failed (${response.status}).`);
            if (kind === 'photo') setPhoto(null);
            else setAudio(null);
            setStatus(`${kind === 'photo' ? 'Photo' : 'Audio'} aapke admin app ko bhej diya.`);
        } catch (error) {
            setStatus(error.message || 'Upload nahi ho saka. Dobara try karein.');
        } finally {
            setBusy('');
        }
    };

    const recordAudio = async () => {
        setBusy('audio');
        setStatus('');
        try {
            if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
                throw new Error('Is browser mein audio recording support nahi hai.');
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const supportedType = [
                'audio/webm;codecs=opus',
                'audio/webm',
                'audio/mp4',
                'audio/ogg',
            ].find((type) => MediaRecorder.isTypeSupported(type));
            const recorder = supportedType
                ? new MediaRecorder(stream, { mimeType: supportedType })
                : new MediaRecorder(stream);
            const chunks = [];
            recorderRef.current = recorder;
            recorder.ondataavailable = (event) => {
                if (event.data.size) chunks.push(event.data);
            };
            recorder.onstop = () => {
                stream.getTracks().forEach((track) => track.stop());
                setAudio(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }));
                setStatus('5 second tak audio record hua. Admin ko bhejne ke liye Upload audio dabayein.');
                setBusy('');
            };
            recorder.start();
            setStatus('Recording chal rahi hai; yeh 5 second mein apne aap rukegi.');
            timerRef.current = setTimeout(() => {
                if (recorder.state === 'recording') recorder.stop();
            }, 5000);
        } catch (error) {
            setStatus(error.name === 'NotAllowedError' ? 'Microphone permission allow nahi hui.' : error.message || 'Microphone nahi khul saka.');
            setBusy('');
        }
    };

    return (
        <section className="family-media-controls" aria-labelledby="family-media-title">
            <h3 id="family-media-title">Optional photo aur audio</h3>
            <p>Yeh controls tabhi chalte hain jab aap inhein khud dabate hain. Har media item upload se pehle aapke review ke liye tayyar hota hai.</p>
            <div className="family-media-actions">
                {!cameraStream.current && !photo && (
                    <button className="btn btn-outline-primary" onClick={startCamera} disabled={Boolean(busy)}>
                        {busy === 'camera' ? 'Camera khul raha hai…' : 'Camera kholein'}
                    </button>
                )}
                {cameraStream.current && (
                    <div className="family-camera-preview">
                        <video ref={videoRef} autoPlay muted playsInline aria-label="Camera preview" />
                        <button className="btn btn-outline-primary" onClick={capturePhoto}>Photo lein</button>
                        <button className="btn btn-outline-secondary" onClick={() => { stopCamera(); setStatus('Camera band hai.'); }}>Camera band karein</button>
                    </div>
                )}
                {photo && (
                    <button className="btn btn-primary" onClick={() => upload('photo', photo, 'family-photo.jpg')} disabled={Boolean(busy)}>
                        {busy === 'photo' ? 'Photo bhej rahe hain…' : 'Captured photo admin ko bhejein'}
                    </button>
                )}
                {!audio && (
                    <button className="btn btn-outline-primary" onClick={recordAudio} disabled={Boolean(busy)}>
                        {busy === 'audio' ? 'Recording…' : '5 sec audio record karein'}
                    </button>
                )}
                {audio && (
                    <button className="btn btn-primary" onClick={() => upload('audio', audio, 'family-audio.webm')} disabled={Boolean(busy)}>
                        {busy === 'audio' ? 'Audio bhej rahe hain…' : 'Recorded audio admin ko bhejein'}
                    </button>
                )}
            </div>
            {status && <p className="family-media-status" role="status" aria-live="polite">{status}</p>}
        </section>
    );
};

export default FamilyMediaControls;
