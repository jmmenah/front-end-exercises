import React,{ useState} from 'react';
import PropTypes from 'prop-types';

const CounterApp = ({value = 10}) => {

    const [ counter, setCounter] = useState( value );

    const hanndleAdd = () => {
        setCounter( counter +1);
    }

    const hanndleMin = () => {
        setCounter( counter -1);
    }

    const hanndleReset = () => {
        setCounter( value);
    }

    return (   
        <>
        <h1>CounterApp</h1>

        <h2> { counter } </h2>

        <button onClick={ hanndleAdd }>+1</button>

        <button onClick={ hanndleMin }>-1</button>

        <button onClick={ hanndleReset }>Reset</button>
        </>
    );
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
}

export default CounterApp;