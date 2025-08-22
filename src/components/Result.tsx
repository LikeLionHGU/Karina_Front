type ResultProps = {
  data: any;
  onReset: () => void; // 부모가 내려준 콜백
};

export default function Result({ data, onReset }: ResultProps) {
    return (
        <>
            <section>
                {/* 결과 표시 */}
                <button onClick={onReset}>다시 분석하기</button>
            </section>
        </>
    )
}