import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import type { ChangeEvent } from 'react';
import type { RegisterSchema } from 'types/Register';

// essential 이용해서 데이터 넘길 때 필수값, 선택값 나누려고 했음
const TERMS_AND_CONDITIONS_LIST = [
  { id: '1', title: '서비스 이용약관', essential: true },
  { id: '2', title: '개인정보 처리방침', essential: true },
  { id: '3', title: '제3자 개인정보 활용 동의', essential: true },
  { id: '4', title: '마케팅 활용 동의', essential: false },
];

const Terms = () => {
  const { setValue } = useFormContext<RegisterSchema>();
  const { register } = useForm();

  const [allFlag, setAllFlag] = useState<boolean>(false);
  const [termsFlag, setTermsFlag] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const toggleCheck = (_e: ChangeEvent<HTMLInputElement>, index: number) => {
    setTermsFlag((prev) => {
      const arr = { ...prev };
      arr[index] = !prev[index];
      return arr;
    });
  };
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    setAllFlag(e.target.checked);
    setTermsFlag((prev) => {
      Object.keys(prev).map((_item, index) => (prev[index] = e.target.checked));
      return {
        ...prev,
      };
    });
  };

  useEffect(() => {
    let allChecked = false;
    if (Object.values(termsFlag).every((item) => item)) {
      allChecked = true;
    }
    setAllFlag(allChecked);
  }, [termsFlag]);

  const isAgree = termsFlag[0] && termsFlag[1] && termsFlag[2];

  return (
    <section>
      <TitleContainer>
        <Title>약관에 동의해주세요.</Title>
      </TitleContainer>
      <TermsAndConditionsContainer>
        <TermsAllCheck>
          <CheckInput
            id="allTerms"
            type="checkbox"
            checked={allFlag}
            {...register('all')}
            onChange={selectAll}
          />
          <Checklabel htmlFor="allTerms">약관 전체 동의하기</Checklabel>
        </TermsAllCheck>
        {TERMS_AND_CONDITIONS_LIST.map((item, index) => {
          return (
            <TermsCheck key={index}>
              <CheckInput
                id={item.title}
                type="checkbox"
                checked={termsFlag[index]}
                {...register(item.title)}
                onChange={(e) => {
                  toggleCheck(e, index);
                }}
              />
              <Checklabel htmlFor={item.title}>
                {item.title} {item.essential ? '(필수)' : '(선택)'}
              </Checklabel>
            </TermsCheck>
          );
        })}
      </TermsAndConditionsContainer>
    </section>
  );
};

export default Terms;

const TitleContainer = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
`;

const TermsAndConditionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input:checked + label::before {
    background: url('images/signup/checkbox_on.png');
  }
`;

const TermsAllCheck = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};

  label {
    ${({ theme }) => theme.fonts.headline_04}
  }
`;

const TermsCheck = styled.div`
  display: flex;
  align-items: center;
`;

const CheckInput = styled.input`
  display: none;
`;

const Checklabel = styled.label`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body_05}

  ::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 10px 0 0;
    background: url('images/signup/checkbox_off.png');
  }
`;
