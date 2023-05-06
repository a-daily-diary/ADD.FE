import styled from '@emotion/styled';
import { useState } from 'react';
import Email from 'components/account/Email';
import Profile from 'components/account/Profile';
import Terms from 'components/account/Terms';
import Seo from 'components/common/Seo';

interface IEnterForm {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  image: string;
  isAgree: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<IEnterForm>({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
    image: '',
    isAgree: false,
  });

  return (
    <>
      <Seo title="회원가입 | a daily diary" />
      <main>
        <FormWrapper>
          {formData.email.length === 0 && (
            <>
              <Title>이메일을 입력해주세요.</Title>
              <Email formData={formData} setFormData={setFormData} />
            </>
          )}
          {formData.email.length > 0 && formData.image === '' && (
            <>
              <Title>프로필 사진을 등록해주세요.</Title>
              <Description>
                프로필로 등록할 사진을 앨범에서 가져오시거나, <br /> 기본 프로필
                이미지에서 선택해주세요.
              </Description>
              <Profile formData={formData} setFormData={setFormData} />
            </>
          )}
          {formData.image.length > 0 && !formData.isAgree && (
            <>
              <Title>약관에 동의해주세요.</Title>
              <Terms formData={formData} setFormData={setFormData} />
            </>
          )}
          {formData.isAgree && <p>회원가입 완료</p>}
        </FormWrapper>
      </main>
    </>
  );
};

export default Register;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  ${({ theme }) => theme.fonts.body_07}
  color: ${({ theme }) => theme.colors.gray_02};
`;

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 28px 20px 12px;
`;
