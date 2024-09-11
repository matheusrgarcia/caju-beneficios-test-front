import { Button } from "~/components/buttons/button";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  registration: Registration;
};

type Registration = {
  employeeName: string;
  admissionDate: string;
  email: string;
};

const RegistrationCard: React.FC<Props> = ({ registration }) => {
  const { employeeName, email, admissionDate } = registration;

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <Button variant="small" bgcolor="rgb(255, 145, 154)">
          Reprovar
        </Button>
        <Button variant="small" bgcolor="rgb(155, 229, 155)">
          Aprovar
        </Button>
        <Button variant="small" bgcolor="#ff8858">
          Revisar novamente
        </Button>

        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
