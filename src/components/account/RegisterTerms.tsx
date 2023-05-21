import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ChangeEventHandler } from 'react';
import type { RegisterSchema } from 'types/Register';
import CheckedOffIcon from 'assets/icons/checkbox_off.svg';
import CheckedOnIcon from 'assets/icons/checkbox_on.svg';
import { FadeInAnimationStyle } from 'styles';

// 이용 약관 동의 목록
// 소셜 로그인/회원가입 적용 시 제 3자 개인정보 활용 동의 필요
const TERMS_AND_CONDITIONS = [
  { id: 'service', title: '서비스 이용약관', required: true },
  { id: 'privacy', title: '개인정보 수집 및 이용 동의', required: true },
  { id: 'marketing', title: '마케팅 활용 동의', required: false },
];

interface TermsAgreement {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
  [key: string]: boolean;
}

type TermsAgreementField =
  | 'termsAgreement.service'
  | 'termsAgreement.privacy'
  | 'termsAgreement.marketing';

const RegisterTerms = () => {
  const { register, setValue } = useFormContext<RegisterSchema>();

  const [agreedToTerms, setAgreedToTerms] = useState<TermsAgreement>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  useEffect(() => {
    if (
      agreedToTerms.service &&
      agreedToTerms.privacy &&
      agreedToTerms.marketing
    ) {
      setAgreedToTerms((state) => {
        return { ...state, all: true };
      });
    } else {
      setAgreedToTerms((state) => {
        return { ...state, all: false };
      });
    }
  }, [agreedToTerms.service, agreedToTerms.privacy, agreedToTerms.marketing]);

  const handleOnToggleCheckbox: ChangeEventHandler = (e) => {
    const { id } = e.target as HTMLInputElement;
    if (id === 'all') {
      if (agreedToTerms.all) {
        setAgreedToTerms({
          all: false,
          service: false,
          privacy: false,
          marketing: false,
        });
        setValue(
          'termsAgreement',
          {
            service: false,
            privacy: false,
            marketing: false,
          },
          { shouldValidate: true },
        );
      } else {
        setAgreedToTerms({
          all: true,
          service: true,
          privacy: true,
          marketing: true,
        });
        setValue(
          'termsAgreement',
          {
            service: true,
            privacy: true,
            marketing: true,
          },
          { shouldValidate: true },
        );
      }
    }
    if (id === 'service') {
      setAgreedToTerms((state) => {
        return { ...state, service: !state.service };
      });
    }
    if (id === 'privacy') {
      setAgreedToTerms((state) => {
        return { ...state, privacy: !state.privacy };
      });
    }
    if (id === 'marketing') {
      setAgreedToTerms((state) => {
        return { ...state, marketing: !state.marketing };
      });
    }
  };

  return (
    <Section>
      <Title>약관에 동의해주세요.</Title>
      <CheckboxInput
        id="all"
        type="checkbox"
        checked={agreedToTerms.all}
        onChange={handleOnToggleCheckbox}
      />
      <CheckboxLabel htmlFor="all">
        {agreedToTerms.all ? <CheckedOnIcon /> : <CheckedOffIcon />}
        약관 전체 동의하기
      </CheckboxLabel>
      <CheckboxList>
        {TERMS_AND_CONDITIONS.map((term) => {
          const { id, title, required } = term;
          const fieldName = `termsAgreement.${id}` as TermsAgreementField;
          return (
            <li key={`terms-and-conditions-${id}`}>
              <CheckboxInput
                id={id}
                type="checkbox"
                checked={agreedToTerms[id]}
                {...register(fieldName, {
                  required: !!required,
                  onChange: handleOnToggleCheckbox,
                })}
              />
              <CheckboxLabel htmlFor={id}>
                {agreedToTerms[id] ? <CheckedOnIcon /> : <CheckedOffIcon />}
                {title} {required ? '(필수)' : '(선택)'}
              </CheckboxLabel>
              {/* TODO: 각 이용 약관 모달 형식으로 보여주기 */}
            </li>
          );
        })}
      </CheckboxList>
    </Section>
  );
};

export default RegisterTerms;

const Section = styled.section`
  ${FadeInAnimationStyle}
`;

const Title = styled.h1`
  margin-bottom: 36px;
  ${({ theme }) => theme.fonts.headline_01}
`;

const CheckboxList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
`;

const CheckboxInput = styled.input`
  display: none;

  &[id='all'] + label {
    ${({ theme }) => theme.fonts.headline_04}
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ theme }) => theme.fonts.body_05}
  cursor: pointer;
`;
