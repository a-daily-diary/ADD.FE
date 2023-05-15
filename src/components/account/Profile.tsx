import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterSchema, RegisterStep } from 'types/Register';

interface RegisterProps {
  registerStep: RegisterStep;
}

const Profile = ({ registerStep }: RegisterProps) => {
  const { register } = useFormContext<RegisterSchema>();

  const [profileImage, setProfileImage] = useState<string>(
    '/images/signup/profile_1.png',
  );
  const [index, setindex] = useState(1);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
      }
    };
  };

  return (
    <section>
      <TitleContainer>
        <Title>프로필 사진을 등록해주세요.</Title>
        <DescriptionText>
          프로필로 등록할 사진을 앨범에서 가져오시거나, <br /> 기본 프로필
          이미지에서 선택해주세요.
        </DescriptionText>
      </TitleContainer>
      <ImageFile>
        <Image src={profileImage} alt="프로필" width={160} height={160} />
        <ImageSection>
          <ImageWrap
            active={index === 0}
            onClick={() => {
              setindex(0);
            }}
          >
            <ImgLabel>
              <ImgInput
                {...register('imgUrl', {
                  required: true,
                })}
                name="image"
                type="file"
                id="img"
                accept="image/*"
                onChange={handleImageInput}
              />
            </ImgLabel>
          </ImageWrap>
          <ImageWrap
            onClick={() => {
              setindex(1);
              setProfileImage('/images/signup/profile_1.png');
            }}
            active={index === 1}
          >
            <Image
              src={'/images/signup/profile_1.png'}
              alt="프로필"
              width={60}
              height={60}
            />
          </ImageWrap>
          <ImageWrap
            onClick={() => {
              setindex(2);
              setProfileImage('/images/signup/profile_2.png');
            }}
            active={index === 2}
          >
            <Image
              src={'/images/signup/profile_2.png'}
              alt="프로필"
              width={60}
              height={60}
            />
          </ImageWrap>
          <ImageWrap
            onClick={() => {
              setindex(3);
              setProfileImage('/images/signup/profile_3.png');
            }}
            active={index === 3}
          >
            <Image
              src={'/images/signup/profile_3.png'}
              alt="프로필"
              width={60}
              height={60}
            />
          </ImageWrap>
        </ImageSection>
      </ImageFile>
    </section>
  );
};

export default Profile;

const TitleContainer = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
`;

const DescriptionText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const ImageFile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const ImageSection = styled.section`
  display: flex;
  gap: 20px;
`;

const ImageWrap = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  border: ${({ active, theme }) =>
    active && `1px solid ${theme.colors.primary_00}`};
  border-radius: 50%;
`;

const ImgLabel = styled.label`
  display: block;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background: url('images/signup/btn_album.png');
  cursor: pointer;
`;

const ImgInput = styled.input`
  display: none;
`;
