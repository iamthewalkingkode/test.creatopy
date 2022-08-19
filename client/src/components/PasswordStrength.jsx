import React from 'react';

const PasswordStrength = props => {

    const { value } = props;

    const [valid, setValid] = React.useState({ min: false, alpha: false, num: false });

    React.useEffect(() => {
        setValid({
            min: (value || '').length >= 8 ? true : false,
            num: /\d/.test(value || ''),
            alpha: /[a-zA-Z]/.test(value || ''),
        });
    }, [value]);

    React.useEffect(() => {
        props.onChange(Object.values(valid).filter(v => !v).length === 0 ? true : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid]);

    return (
        <React.Fragment>
            <CustomRadio selected={valid.min} label="At least 8 characters" />
            <CustomRadio selected={valid.alpha} label="Alphabets [a-Z]" />
            <CustomRadio selected={valid.num} label="Numbers [0-9]" />

            <div style={{ clear: 'both' }} />
        </React.Fragment>
    );
};

export default PasswordStrength;


const CustomRadio = ({ label, selected }) => {

    return (
        <React.Fragment>
            <div className="flex items-center float-left px-2 py-1 mr-2 mb-2" style={{ background: '#eee', borderRadius: 45 }}>
                <div style={{ opacity: selected ? 1 : .3 }}>
                    {selected ? <i className="mdi mdi-check-circle" /> : <i className="mdi mdi-radiobox-marked" />}
                </div>
                <span className="ml-2 fs-12">{label}</span>
            </div>
        </React.Fragment>
    );
}