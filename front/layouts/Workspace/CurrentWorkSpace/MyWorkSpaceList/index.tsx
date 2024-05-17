import SquareIcon from '@components/SquareIcon';
import useGetChannels from '@hooks/useSWR/useGetChannels';
import { WorkSpace } from '@hooks/useSWR/useGetWorkspaces';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IPopupListProps {
  list: WorkSpace[];
  onClickAddWorkSpaceBtn: () => void;
  curWorkSpace: {
    idx: number;
    handleIdx: (idx: number) => void;
  };
}

/** 내 워크 스페이스 리스트
 *
 * 1. 리스트 및 워크스페이스 추가버튼 포함
 */
const MyWorkSpaceList = ({
  list,
  curWorkSpace,
  onClickAddWorkSpaceBtn,
}: IPopupListProps) => {
  const navigate = useNavigate();
  const { channels } = useGetChannels();

  return (
    <ul>
      {list.map((workspace, workspaceIdx) => (
        <li key={workspace.id}>
          <button
            onClick={() => {
              curWorkSpace.handleIdx(workspaceIdx);
              if (channels && channels[0]) {
                navigate(
                  `/workspace/${workspace.url}/channel/${channels[0].name}`,
                );
              }
            }}
          >
            <SquareIcon>{workspace.name[0]}</SquareIcon>
            {workspace.name}
          </button>
        </li>
      ))}
      <li>
        <AddWorkSpaceBtn onClick={onClickAddWorkSpaceBtn} />
      </li>
    </ul>
  );
};

interface IAddWorkSpaceBtnProps {
  onClick: () => void;
}
const AddWorkSpaceBtn = ({ onClick }: IAddWorkSpaceBtnProps) => {
  return (
    <button onClick={onClick} className="add-workspace-btn">
      <SquareIcon>
        <svg
          data-106="true"
          data-qa="plus-filled"
          aria-hidden="true"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 3.5a1 1 0 1 0-2 0V9H3.5a1 1 0 0 0 0 2H9v5.5a1 1 0 1 0 2 0V11h5.5a1 1 0 1 0 0-2H11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </SquareIcon>
      워크스페이스 추가
    </button>
  );
};

export default MyWorkSpaceList;
