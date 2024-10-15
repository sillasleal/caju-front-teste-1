import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "~/models/user.model";
import useApi from "~/hooks/useApi";

const DashboardPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { getUsers } = useApi();

  const onSearch = useCallback(
    (cpf?: string) => getUsers(cpf).then((data) => setUsers(data)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return (
    <S.Container>
      <SearchBar onSearch={onSearch} />
      <Collumns registrations={users} onUpdate={() => onSearch()} />
    </S.Container>
  );
};
export default DashboardPage;
