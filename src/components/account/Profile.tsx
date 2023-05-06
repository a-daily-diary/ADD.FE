import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { RegisterSchema } from 'types/Register';
import Button from 'components/common/Button';

const Profile = ({
  formData,
  setFormData,
}: {
  formData: RegisterSchema;
  setFormData: Dispatch<SetStateAction<RegisterSchema>>;
}) => {
  const { register, handleSubmit } = useForm();

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

  const onSubmitHandler = () => {
    setFormData({ ...formData, imgUrl: profileImage });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
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
                {...register('image', {
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
      <Button pattern="box" size="lg" fullWidth>
        다음
      </Button>
    </Form>
  );
};

export default Profile;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 40px 0 0;
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
