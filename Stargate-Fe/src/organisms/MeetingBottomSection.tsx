import React, { useState, useRef } from 'react';
import CSVReader from 'react-csv-reader';
import AdminBtn from '@/atoms/AdminBtn.tsx';
import AdminInput from '@/atoms/AdminInput.tsx';

interface FormData {
  starName: string;
  members: (string | undefined)[];
  fans: (string | undefined)[];
}

const MeetingBottomSection = () => {
  const [starValue, setStarValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [fanValue, setFanValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    starName: '',
    members: [],
    fans: [],
  });

  const handleStarvalue = (value: string) => {
    setStarValue(value);
    console.log(`입력값 ${starValue}`);
  };

  const handleMembervalue = (value: string) => {
    setMemberValue(value);
    console.log(`입력값 ${memberValue}`);
  };

  const handleFanValue = (value: string) => {
    setFanValue(value);
    console.log(`입력값 ${fanValue}`);
  };

  // const handleForm = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: keyof FormData
  // ) => {
  //   setFormData({ ...formData, [fieldName]: e.target.value });
  // };

  const addStar = (name: string) => {
    setFormData({ ...formData, starName: name });
    setStarValue('');
  };

  const addMember = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, name],
    }));
    setMemberValue('');
  };

  const addFans = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fans: [...prevFormData.fans, name], // 이전 members 배열을 그대로 가져옵니다.
    }));
    setFanValue(''); // 입력 후 값을 초기화합니다.
  };

  const handleCsvData = (data, fileInfo) => {
    console.log(data);
  };

  return (
    <>
      {/* 연예인명 추가 */}
      <div className="flex items-end">
        <AdminInput
          labelFor="연예인명 / 그룹명"
          type="text"
          onInputChange={handleStarvalue}
          value={starValue}
        >
          <AdminBtn text="추가" onClick={() => addStar(starValue)} />
        </AdminInput>
        {formData.starName ? (
          <div className="w-62 mt-2 flex justify-between items-center">
            <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
              {formData.starName}
            </div>
            <AdminBtn text="삭제" onClick={() => handle} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 멤버명 추가 */}
      <div className="flex flex-col items-start">
        <AdminInput
          labelFor="그룹 멤버명"
          type="text"
          onInputChange={handleMembervalue}
          value={memberValue}
        >
          <AdminBtn text="추가" onClick={() => addMember(memberValue)} />
        </AdminInput>
      </div>
      <div className="flex flex-col items-start w-52 justify-between">
        {formData.members.map((item, index) => (
          <div
            key={index}
            className="w-62 mt-2 flex justify-between items-center"
          >
            <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
              {item}
            </div>
            <AdminBtn text="삭제" onClick={() => handle} />
          </div>
        ))}
      </div>
      {/* 참가자 추가 */}
      <div className="flex items-end">
        <AdminInput
          labelFor="참가자 등록"
          type="text"
          onInputChange={handleFanValue}
          value={fanValue}
        >
          <AdminBtn text="추가" onClick={() => addFans(fanValue)} />
        </AdminInput>
        <div className="relative inline-block w-32 h-8 cursor-pointer">
          <CSVReader
            cssClass="csv-btn"
            label="CSV 파일 불러오기"
            onFileLoaded={handleCsvData}
          />
          <div className="w-32 h-8 leading-8 text-12 font-medium bg-admingray font-suit text-black rounded-sm text-center">
            CSV 파일 불러오기
          </div>
        </div>
        <div className="flex flex-col items-start w-52 justify-between">
          {formData.fans.map((item, index) => (
            <div
              key={index}
              className="w-62 mt-2 flex justify-between items-center"
            >
              <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
                {item}
              </div>
              <AdminBtn text="삭제" onClick={() => handle} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-1 my-2 text-left font-suit font-medium text-14 text-white">
        총 미팅 시간은 분 초 입니다
      </div>
    </>
  );
};

export default MeetingBottomSection;
