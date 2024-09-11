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
      <S.Delete>
        <HiOutlineTrash />
      </S.Delete>
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
        <Button variant="small" bgcolor="rgb(198, 9, 25)">
          Reprovar
        </Button>
        <Button variant="small" bgcolor="rgb(20, 137, 20)">
          Aprovar
        </Button>
        <Button variant="small" bgcolor="#851b6c">
          Revisar novamente
        </Button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
