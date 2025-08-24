// pages/VideoAnalysisPage.tsx
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import Processing from "../components/Processing";
import Result from "../components/Result";
import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";

type Step = "idle" | "processing" | "done" | "error";

export default function VideoAnalysisPage() {
  const [step, setStep] = useState<Step>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [resultList, setResultList] = useState<any>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  function parseJwt(t?: string | null) {
    try {
      if (!t) return null;
      const b = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(b));
    } catch {
      return null;
    }
  }

  const postVideo = async (file: File) => {
    const form = new FormData();
    form.append("video", file, file.name);
    if (!hasToken()) {
      logout();
      return;
    }
    const token = localStorage.getItem("jwt");
    setStep("processing");
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
      setResultList(res.data.analysisResult);
      const id = String(res.data.articleId);
      setArticleId(id);
      setStep("done");
    } catch (e: any) {
      if (isTokenExpired(e)) {
        logout();
        return;
      }
      setStep("error");
    }
  };

  // 재분석(수정 요청) — FormData로 articleId 전송
  const reanalyze = async () => {
    if (!articleId) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      if (!hasToken()) {
        logout();
        return;
      }
      const requestData = {
        articleId: articleId,
      };
      const token = localStorage.getItem("jwt");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/fisher/post/edit/info`,
        requestData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: ctrl.signal,
        }
      );
      setResultList(null);
      setArticleId(null);
      setStep("idle");
    } catch (e: any) {
      if (axios.isCancel(e)) return;
      if (isTokenExpired(e)) {
        logout();
        return;
      }
      setError(e?.message ?? "재분석 요청 중 오류가 발생했습니다.");
      setStep("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      {step === "idle" && <UploadBox handleSelect={postVideo} />}
      {step === "processing" && <Processing />}

      {step === "done" && resultList && (
        <Result
          articleData={articleId}
          data={resultList}
          onReset={reanalyze} //  여기서 함수 “참조”만 넘기고,
        />
      )}

      {step === "error" && (
        <div>
          <p>{error}</p>
          <button onClick={() => setStep("idle")}>다시 시도</button>
        </div>
      )}
    </main>
  );
}
