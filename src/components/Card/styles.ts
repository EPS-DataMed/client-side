import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 857px;
  height: 540px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 2em;
`;

export const CardContentHeader = styled.div`
  margin: 0;
  font-size: 1em;
  color: #333;
`;

export const CardContentMainInformation = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-top: 32px
`;

export const CardContentSecondaryInformation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px
`;

export const DescriptionSecondaryInformation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px
`;

export const TitleItem = styled.div`
  font-size: 1em;
  color: #333;
  font-weight: "bold"
`;

export const ItemIcon = styled.div`
    color: #333;
`;
