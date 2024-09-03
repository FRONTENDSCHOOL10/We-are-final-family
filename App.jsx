import { Routes, Route } from 'react-router-dom';
import Intro from '@/pages/Intro/Intro';
import Test from '@/test';
import '@/styles/iconfonts.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
