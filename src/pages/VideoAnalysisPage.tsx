// pages/VideoAnalysisPage.tsx
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import Processing from "../components/Processing";
import Restart from "../components/Restart";
import Result from "../components/Result";
import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import ErrorModal from "../components/ErrorModal";
import ConfirmModal from "../components/ConfirmModal";

type Step = "idle" | "processing" | "done" | "error" | "restart";

export default function VideoAnalysisPage() {
  const [step, setStep] = useState<Step>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [resultList, setResultList] = useState<any>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  // 모달 상태
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  //로그인 확인용
  const [afterClose, setAfterClose] = useState<null | (() => void)>(null); 


  const openError = (msg: string, onClose?: () => void) => {
    setErrorMessage(msg);
    setError(msg);
    setAfterClose(() => onClose ?? null);
    setErrorModalOpen(true);
    setStep("error");
    
  };

  const openSuccess = (title: string, msg: string) => {
    setConfirmTitle(title);
    setConfirmMessage(msg);
    setConfirmModalOpen(true);
  };

  const closeSuccess = () => {
    setConfirmModalOpen(false);
  };

  const closeError = () => {
    setErrorModalOpen(false);
    //비로그인시 모달 창 닫을때
    if (afterClose) {
      const fn = afterClose;
      setAfterClose(null);
      fn();
    }
  };

  const postVideo = async (file: File) => {
    const form = new FormData();
    form.append("video", file, file.name);

    if (!hasToken()) {
      openError("로그인 후 이용해 주세요", () => {
      logout();
    });
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
          signal: ctrl.signal,
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
      // 에러 모달
      openError(e?.message ?? "업로드 중 오류가 발생했습니다.");
    }
  };

  // 재분석(수정 요청)
  const reanalyze = async () => {
    setStep("restart");

    if (!articleId) {
      // alert 대체
      openError("articleId가 없습니다.");
      return;
    }

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      if (!hasToken()) {
            openError("로그인 후 이용해 주세요", () => {
          logout();
        });
        return;
      }
      const requestData = { articleId };
      const token = localStorage.getItem("jwt");

      await axios.put(
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

      //  성공 모달
      openSuccess("재분석 요청 완료", "재분석 요청이 접수되었습니다.");
    } catch (e: any) {
      if (axios.isCancel(e)) return;
      if (isTokenExpired(e)) {
        logout();
        return;
      }
      // 에러 모달
      openError(e?.message ?? "재분석 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <main>
      {/* 모달 */}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={closeError}
        message={errorMessage}
      />
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={closeSuccess}
        onConfirm={closeSuccess}     // 타입 충족용
        title={confirmTitle}
        body={confirmMessage}
        isSuccess                     // 단일 버튼 모드
        singleText="완료"             //가운데 ‘완료’ 버튼
      />

      {isLoading && <LoadingSpinner />}
      {step === "idle" && <UploadBox handleSelect={postVideo} />}
      {step === "processing" && <Processing />}
      {step === "restart" && <Restart />}

      {step === "done" && resultList && (
        <Result
          articleData={articleId}
          data={resultList}
          onReset={reanalyze}
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
