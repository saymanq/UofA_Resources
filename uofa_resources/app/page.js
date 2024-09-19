import NavBar from '../components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login/page';
import PDFDownload from '../components/PDFDownload';

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>My PDF</h1>
      <PDFDownload pdfPath="gs://uofa-resources.appspot.com"/>
    </div>
  )
    }
