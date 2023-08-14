import { useEffect, useState, ChangeEvent } from 'react';
import MeetingLeftSection from '@/organisms/event/MeetingLeftSection';
import MeetingRightSection from '@/organisms/event/MeetingRightSection';
import MeetingBottomSection from '@/organisms/event/MeetingBottomSection';
import BtnBlue from '@/atoms/common/BtnBlue';
import { fetchEventDetailData } from '@/services/adminEvent';
import BoardHeaderNav from '@/atoms/board/BoardHeaderNav';
import { useNavigate, Link } from 'react-router-dom';

interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingFUser {
  email: string;
  orderNum: number;
  isRegister: string;
  name: string;
}

interface MeetingMember {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  groupNo: number;
  groupName: string;
  imageFileInfo: ImageFileInfo;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}

const AdminEventDetail = () => {
  const [group, setGroup] = useState<[]>([]);
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
  const navigate = useNavigate();

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
      }
      console.log('로딩완료', location);
    };
    fetchEventDetail();
  }, []);

  const handleLetterList = (uuid: string) => {
    navigate(`/admin/event/letters/${uuid}`);
  };
  const handleMonitoring = (uuid: string) => {
    console.log(uuid, '제작중');
  };

  return (
    <div className="w-xl flex flex-col items-center">
      <BoardHeaderNav isAdmin={true}></BoardHeaderNav>
      <div className="my-10 text-center form-title">{data.name}</div>
      <div className="mb-8 w-full flex justify-center">
        <div className="flex w-5/12">
          {/* <MeetingLeftSection formData={formData} setFormData={setFormData} /> */}
        </div>
        <div className="flex w-5/12">
          {/* <MeetingRightSection formData={formData} setFormData={setFormData} /> */}
        </div>
      </div>
      <div className="flex flex-col justify-center w-5/12">
        <div className="flex">
          {/* <MeetingBottomSection
            formData={formData}
            setFormData={setFormData}
            group={group}
            setGroup={setGroup}
          /> */}
        </div>
      </div>
      <div className="flex justify-evenly w-m mx-8 my-20 text-center">
        <BtnBlue text="편지 리스트" onClick={() => handleLetterList(`uuid`)} />
        <BtnBlue
          text="모니터링 입장"
          onClick={() => handleMonitoring(`uuid`)}
        />
        <Link to="/admin/event/create" state={{ uuid: data.uuid }}>
          <BtnBlue text="수정" />
        </Link>
      </div>
    </div>
  );
};

export default AdminEventDetail;
