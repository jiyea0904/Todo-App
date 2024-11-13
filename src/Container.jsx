const Container = (props) => {
    const style = {
        width: "375px",
        margin: "2em 0",
    };
    
    return (
      <div style={style}>
        {props.children}
      </div>
    );
  };
  
  export default Container;