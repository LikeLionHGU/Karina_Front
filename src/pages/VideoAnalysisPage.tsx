// pages/VideoAnalysisPage.tsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UploadBox from '../components/UploadBox';
import Processing from '../components/Processing';
import Result from '../components/Result';
/*import { useNavigate } from 'react-router-dom';*/

type Step = 'idle' | 'processing' | 'done' | 'error';
const token = localStorage.getItem('jwt'); // 저장한 키 이름에 맞게


export default function VideoAnalysisPage() {
  /*const navigate = useNavigate();*/
  const [step, setStep] = useState<Step>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  
  const handleSelect = async (file: File) => {
    console.log('file명:', file);
    console.log('토큰:', token);
    const form = new FormData();
    form.append('video', file);

    setStep('processing');
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/fisher/post/video`, form, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        withCredentials: false,
        signal: ctrl.signal,
      });
      console.log('response:', res.data);
      setResult(res.data);  // response로 받아온 물고기 종류
      setStep('done');
    } catch (error: any) {
      if (axios.isCancel(error)) return;
      setError(error?.message ?? '분석 중 오류가 발생했습니다.');
      setStep('error');
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <main>
      {step === 'idle' && <UploadBox handleSelect={handleSelect} />}
      {step === 'processing' && <Processing />}
      {/*부모 요소에서 onReset함수 만들어 다시 분석 가능하도록*/}
      {step === 'done' && result && <Result data={result} onReset={() => { setResult(null); setStep('idle'); setStep('idle'); }} />}
      {step === 'error' && (
        <div>
          <p>{error}</p>
          <button onClick={() => setStep('idle')}>다시 시도</button>
        </div>
      )}
    </main>
  );
}
