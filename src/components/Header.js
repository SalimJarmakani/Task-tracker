import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = ({revealAddTask, showAdd}) => {
  const location= useLocation()
  return (
    <header className='header'>
        <h1>Task tracker</h1>

        {location.pathname==='/' &&
        <Button color={showAdd ? 'red' : 'green'} 
        text={showAdd ? 'Close' : 'Add'}
        onClick={()=>revealAddTask()} />}
        
    </header>
  )
}

export default Header