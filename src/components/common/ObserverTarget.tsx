import type { Dispatch, SetStateAction } from 'react';

interface ObserverTargetProps {
  isLoading: boolean;
  isError: boolean;
  targetRef: Dispatch<SetStateAction<HTMLElement | null>>;
}

export const ObserverTarget = ({
  isLoading,
  isError,
  targetRef,
}: ObserverTargetProps) => {
  return (
    <div ref={targetRef}>
      {/* TODO: 로딩/에러 시 UI 수정 */}
      {isLoading && <p>데이터를 불러오는 중입니다.</p>}
      {isError && <p>데이터를 불러오는데 실패했습니다.</p>}
    </div>
  );
};
