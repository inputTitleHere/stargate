import { useEffect, useState } from 'react';
import MeetingLeftDetail from '@/organisms/event/MeetingLeftDetail';
import MeetingRightDetail from '@/organisms/event/MeetingRightDetail';
import MeetingBottomDetail from '@/organisms/event/MeetingBottomDetail';
import BtnBlue from '@/atoms/common/BtnBlue';
import { fetchEventDetailData } from '@/services/adminEvent';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import { Link } from 'react-router-dom';
import { MeetingData } from '@/types/event/type';
import LettersModalBox from '@/organisms/event/LettersModalBox';

const AdminEventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<MeetingData>({
    uuid: '',
    name: '',
    startDate: '',
    waitingTime: 10,
    meetingTime: 80,
    notice: '',
    photoNum: 0,
    groupNo: 0,
    groupName: '',
    imageFileInfo: {
      filename: '',
      fileUrl: '',
    },
    meetingFUsers: [],
    meetingMembers: [],
  });
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // 미팅 디테일 가져오기
  useEffect(() => {
    const fetchEventDetail = async () => {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const uuid = parts[parts.length - 1];
      console.log(uuid);

      const fetchedData = await fetchEventDetailData(uuid);
      if (fetchedData) {
        setData(fetchedData);
        console.log('데이터는', fetchedData);
        console.log(fetchedData.startDate);
        setLoading(false);
      }
      console.log('로딩완료', location);
    };
    fetchEventDetail();
  }, []);

  return (
    <div className="flex w-xl flex-col items-center">
      <BoardHeaderNav isAdmin={true}></BoardHeaderNav>
      <div className="my-10 text-center form-title">{data.name}</div>
      <div className="mb-8 w-full flex justify-end">
        {isModalOpen && (
          <LettersModalBox
            isOpen={isModalOpen}
            onClose={handleModalClose}
            uuid={data.uuid}
          />
        )}
        <div className="flex flex-col w-5/12 h-full">
          {loading === false && <MeetingLeftDetail formData={data} />}
          <div className='my-4'></div>
          {loading === false && <MeetingBottomDetail formData={data} />}
        </div>
        <div className="flex w-5/12">
          {loading === false && <MeetingRightDetail formData={data} />}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex w-5/6"></div>
      </div>
      <div className="flex justify-evenly w-s my-20 text-center">
        <BtnBlue text="편지 리스트" onClick={handleModalOpen} />
        <Link to="/admin/event/create" state={{ uuid: data.uuid }}>
          <BtnBlue text="수정" />
        </Link>
      </div>
    </div>
  );
};

export default AdminEventDetail;