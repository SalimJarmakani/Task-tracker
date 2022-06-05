import Button from './Button'
const Header = ({revealAddTask, showAdd}) => {

    const onClick = () => {
        console.log('Click')
    }
  return (
    <header className='header'>
        <h1>Task tracker</h1>
        <Button color={showAdd ? 'red' : 'green'} 
        text={showAdd ? 'Close' : 'Add'}
        onClick={()=>revealAddTask()} />
        
    </header>
  )
}

export default Header