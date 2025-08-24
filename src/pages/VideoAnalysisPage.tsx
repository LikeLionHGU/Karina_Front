// pages/VideoAnalysisPage.tsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UploadBox from '../components/UploadBox';
import Processing from '../components/Processing';
import Result from '../components/Result';

type Step = 'idle' | 'processing' | 'done' | 'error';

export default function VideoAnalysisPage() {
  const [step, setStep] = useState<Step>('idle');
  const [resultList, setResultList] = useState<any>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  function parseJwt(t?: string|null) {
        try {
            if (!t) return null;
            const b = t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
            return JSON.parse(atob(b));
        } catch { return null; }
    }

   
  const postVideo = async (file: File) => {
    const form = new FormData();
    form.append('video', file, file.name); // 필드명 정확히 'video'
    const token = localStorage.getItem('jwt');
    const payload = parseJwt(token);
    console.log('payload:', payload);
    console.log('exp:', payload?.exp, 'now:', Math.floor(Date.now()/1000));
    console.log(token)
    setStep('processing');
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/fisher/post/upload`,
        form,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      setResultList(res.data.analysisResult); // { "전갱이": 29, ... }
      const id = String(res.data.articleId);  // 무조건 문자열로
      setArticleId(id);
      setStep('done');
    } catch (e: any) {
        if (axios.isAxiosError(e)) {
            console.log('status:', e.response?.status);
            console.log('data:', e.response?.data); // ← 여기 메시지에 'Access is denied', 'Invalid CSRF' 등 단서가 나와요
        }
        setStep('error');
    }
  };

  // 재분석(수정 요청) — FormData로 articleId 전송
  const reanalyze = async () => {
    if (!articleId) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const requestData = {
        articleId : articleId
      }

      const token = localStorage.getItem('jwt');
      console.log(requestData)
      console.log(token)
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/fisher/post/edit/info`,
        requestData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: ctrl.signal,
        }
      );

      // 이전 데이터 초기화 & 첫 분석 화면으로 넘겨줌
        setResultList(null);
        setArticleId(null);
        setStep('idle');         
    } catch (e: any) {
      if (axios.isCancel(e)) return;
      setError(e?.message ?? '재분석 요청 중 오류가 발생했습니다.');
      setStep('error');
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <main>
      {step === 'idle' && <UploadBox handleSelect={postVideo} />}
      {step === 'processing' && <Processing />}

      {step === 'done' && resultList && (
        <Result
          articleData = {articleId}
          data={resultList}
          onReset={reanalyze}          //  여기서 함수 “참조”만 넘기고,
        />
      )}

      {step === 'error' && (
        <div>
          <p>{error}</p>
          <button onClick={() => setStep('idle')}>다시 시도</button>
        </div>
      )}
    </main>
  );
}
