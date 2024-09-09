import S from './Error.module.css';
import { useRouteError } from 'react-router-dom';
import Navigation from '@/components/App/Navigation';
import Header from '@/components/App/Header';

function Error() {
  const { status, statusText, data } = useRouteError();

  return (
    <div className={S.layout}>
      <Header />
      <main className={S.errorLayout}>
        <h1 className="hdg-lg">
          <q>
            {status} {statusText}
          </q>
          <br />
          오류 발생!
        </h1>
        <p className="para-sm">오류 발생 요인은 다음과 같습니다.</p>
        <code className="para-md">{data}</code>
      </main>
      <Navigation />
    </div>
  );
}

export default Error;
