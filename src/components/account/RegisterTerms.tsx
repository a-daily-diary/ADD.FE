import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TermsDetail } from './TermsDetail';
import type { ChangeEventHandler } from 'react';
import type { RegisterForm } from 'types/register';
import type { TermsAgreementId } from 'types/termsAgreement';
import { ArrowRightIcon, CheckedOffIcon, CheckedOnIcon } from 'assets/icons';
import { useTermsAgreements } from 'hooks/services';
import { FadeInAnimationStyle } from 'styles';

interface TermsAgreementState {
  all: boolean;
  service: boolean;
  privacy: boolean;
}

type TermsAgreementField = 'termsAgreement.service' | 'termsAgreement.privacy';

export const RegisterTerms = () => {
  const { termsAgreementsData } = useTermsAgreements();
  const { register, setValue } = useFormContext<RegisterForm>();

  const [targetTerms, setTargetTerms] = useState<TermsAgreementId | null>(null);

  const [agreedToTerms, setAgreedToTerms] = useState<TermsAgreementState>({
    all: false,
    service: false,
    privacy: false,
  });

  useEffect(() => {
    if (agreedToTerms.service && agreedToTerms.privacy) {
      setAgreedToTerms((state) => {
        return { ...state, all: true };
      });
    } else {
      setAgreedToTerms((state) => {
        return { ...state, all: false };
      });
    }
  }, [agreedToTerms.service, agreedToTerms.privacy]);

  const handleOnToggleCheckbox: ChangeEventHandler = (e) => {
    const { id } = e.target as HTMLInputElement;
    if (id === 'all') {
      if (agreedToTerms.all) {
        setAgreedToTerms({
          all: false,
          service: false,
          privacy: false,
        });
        setValue(
          'termsAgreement',
          {
            service: false,
            privacy: false,
          },
          { shouldValidate: true },
        );
      } else {
        setAgreedToTerms({
          all: true,
          service: true,
          privacy: true,
        });
        setValue(
          'termsAgreement',
          {
            service: true,
            privacy: true,
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
  };

  const onCloseTermsDetail = () => {
    setTargetTerms(null);
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
        {termsAgreementsData?.map((term) => {
          const { id, title, contents, isRequired } = term;
          const fieldName = `termsAgreement.${id}` as TermsAgreementField;
          return (
            <ListItem key={`terms-and-conditions-${id}`}>
              <CheckboxInput
                id={id}
                type="checkbox"
                checked={agreedToTerms[id]}
                {...register(fieldName, {
                  required: !!isRequired,
                  onChange: handleOnToggleCheckbox,
                })}
              />
              <CheckboxLabel htmlFor={id}>
                {agreedToTerms[id] ? <CheckedOnIcon /> : <CheckedOffIcon />}
                {title} {isRequired && '(필수)'}
              </CheckboxLabel>
              <IconButton
                type="button"
                onClick={() => {
                  setTargetTerms(id);
                }}
              >
                <ArrowRightIcon />
              </IconButton>
              {targetTerms === id && (
                <TermsDetail
                  title={title}
                  contents={contents}
                  onClose={onCloseTermsDetail}
                />
              )}
            </ListItem>
          );
        })}
      </CheckboxList>
    </Section>
  );
};

const Section = styled.section`
  ${FadeInAnimationStyle}
`;

const Title = styled.h1`
  margin-bottom: 36px;
  ${({ theme }) => theme.fonts.headline_01}
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
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
