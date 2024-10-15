import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "~/models/user.model";
import { getUsers } from "~/services/user.service";

const DashboardPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const onSearch = useCallback(
    (cpf?: string) => getUsers(cpf).then((data) => setUsers(data)),
    []
  );

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return (
    <S.Container>
      <SearchBar onSearch={onSearch} />
      <Collumns registrations={users} />
    </S.Container>
  );
};
export default DashboardPage;
