import styled from '@emotion/styled';

interface HighlightTextProps {
  text: string;
  keyword: string;
}

export const HighlightText = ({ text, keyword }: HighlightTextProps) => {
  const regExp = new RegExp(keyword, 'gi');
  const replaceText = text.replace(regExp, `<mark>${keyword}</mark>`);

  return <Text dangerouslySetInnerHTML={{ __html: replaceText }} />;
};

const Text = styled.span`
  & mark {
    color: ${({ theme }) => theme.colors.primary_00};
    background-color: transparent;
  }
`;
