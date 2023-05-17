import { Background, LoadingText } from './LoadingStyles'
import Spinner from '../assets/spinner.gif'

const Loading = () => {
  return (
    <Background>
      <img src={Spinner} alt="Loading..." width="5%" />
      <LoadingText>조금만 기다려 주세요.</LoadingText>
    </Background>
  )
}
export default Loading
