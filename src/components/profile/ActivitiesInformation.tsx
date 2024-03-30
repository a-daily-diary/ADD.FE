import styled from '@emotion/styled';
import { ColorChip } from 'components/common';
import { theme } from 'styles';

const ACTIVITIES_INFORMATION = [
  {
    color: theme.colors.primary_02,
    label: '활동 1회 이상',
  },
  {
    color: theme.colors.primary_01,
    label: '활동 3회 이상',
  },
  {
    color: theme.colors.primary_00,
    label: '활동 5회 이상',
  },
];

export const ActivitiesInformation = () => {
  return (
    <Container>
      {ACTIVITIES_INFORMATION.map((information) => {
        const { color, label } = information;
        return (
          <Information key={label}>
            <ColorChip color={color} />
            <span>{label}</span>
          </Information>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  padding: 5px 20px;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 130px;
  width: fit-content;
  padding: 9px 0;
  ${({ theme }) => theme.fonts.body_07}
`;
