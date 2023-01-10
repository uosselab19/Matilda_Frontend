import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';

//여기서 bootstrap의 모든 라이브러리를 불러옴.
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

// html과 라우팅 컴포넌트를 연결시켜주는 다리역할
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(<App />);