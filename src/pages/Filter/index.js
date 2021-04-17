import React, {useState} from "react";
import {connect} from "react-redux";
import {useFormState} from 'react-use-form-state';
import {Row} from 'reactstrap';


const Filter = () => {
    const [result, setResult] = useState([]);
    const [subResult, setSubResult] = useState([]);
    const [formState, {text}] = useFormState({
        rows: 50,
        subs: 10,
        subResult: 5
    });
    
    const [subFormState, setSubFormState] = useFormState({
        // h0: 'Nigeria',
        // a0: 'Brazil',
        // h1: 'Togo',
        // a1: 'Ghana',
        // h2: 'Argentina',
        // a2: 'Germany',
        // h3: 'hjolalsd',
        // a3: 'frgsfsd',
        // h4: 'sdsdfdsf',
        // a4: 'sdfsdfsd',
        // h5: 'svdvsdvsd',
        // a5: 'vsdvdsv',
        // h6: 'dvsdvsd',
        // a6: 'sdvsdv',
        // h7: 'Argevsdvdsntina',
        // a7: 'Germany',
        // h8: 'Argevsdvdsntina',
        // a8: 'Germany',
        // h9: 'Argevsdvdsntina',
        // a9: 'Germany'
    });
    
    
    const {values} = formState;
    
    const getRandomSubarray = (arr, size) => {
        const shuffled = arr.slice(0);
        let i = arr.length;
        const min = i - size;
        let temp;
        let index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('values :::', values);
        const {rows, subs, subResult} = values;
        formState.setField('rows', rows);
        formState.setField('subs', subs);
        formState.setField('subResult', subResult);
        generateSub();
        
    };
    
    const generateSub = () => {
        const sentValue = subFormState.values;
        const all = [];
        for (let i = 0; i < values.rows; i++) {
            all.push({home: sentValue[`h${i}`], away: sentValue[`a${i}`]});
        }
        const result = getRandomSubarray(all, values.subs);
        setResult(result);
    };
    
    const handleSubResultClick = () => {
        const subresult = getRandomSubarray(result, values.subResult);
        setSubResult(subresult);
    };
    
    const handleSubSubmit = (e) => {
        e.preventDefault();
        generateSub();
    };
    
    return (
        <div className="px-3 text-center">
            <h1 className="mb-lg-5">Data Algorithm</h1>
            <form
                onSubmit={handleSubmit}>
                <input {...text('rows')} required className="me-lg-2"/>
                <input {...text('subs')} required className="me-lg-2"/>
                <input {...text('subResult')} required className="me-lg-2"/>
                <button>Generate</button>
            </form>
            {values.rows && <h4 className="mt-lg-5">Data</h4>}
            {values.rows && <Row>
                <form
                    onSubmit={handleSubSubmit}>
                    {values.rows && Array.from(Array(values.rows).keys()).map((row, index) => (
                        <div key={index}>
                            <span className="p-5">{(index + 1)}</span>
                            <input{...setSubFormState.text(`h${index}`)} required className="me-lg-2"/>
                            <span className="p-5">VS</span>
                            <input{...setSubFormState.text(`a${index}`)} required className="me-lg-2"/>
                        </div>
                    ))}
                    <button className="mt-lg-5 ">Generate</button>
                </form>
            </Row>
            }
            
            {result.length > 0 && <h4 className="mt-lg-5">Generated</h4>}
            <Row>
                <table>
                    <tbody>
                    {result && result.map((res, index) => (
                        <tr key={index}>
                            <td>{res.home}</td>
                            <td>VS</td>
                            <td>{res.away}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}>
                            {result.length > 0 &&
                            <button className="mt-lg-5" onClick={handleSubResultClick}>Generate Sub</button>}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Row>
            
            {subResult.length > 0 && <h4 className="mt-lg-5">Smaller Sub Generated</h4>}
            <Row>
                <table>
                    <tbody>
                    {subResult.length > 0 && subResult.map((res, index) => (
                        <tr key={index}>
                            <td>{res.home}</td>
                            <td>VS</td>
                            <td>{res.away}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Row>
        
        </div>
    );
};

const stateToProps = (state) => ({});
const dispatchToProps = {};
export default connect(stateToProps, dispatchToProps)(Filter);
