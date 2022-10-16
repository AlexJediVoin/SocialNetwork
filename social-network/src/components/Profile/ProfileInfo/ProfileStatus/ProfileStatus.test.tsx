import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', function () {
    test(("Status from props should be in the state"),()=>{
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={()=>{}}/>);
        const instance = component.getInstance();
        expect(instance?.props.status).toBe("it-kamasutra");
    });
    test(("After creatin <span> with status should be displayed"),()=>{
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={()=>{}}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test(("After creatin <input>  shouldn't be displayed"),()=>{
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={()=>{}}/>);
        const root = component.root;

        expect(()=>{
            let input = root.findByType("input");
        }).toThrow();
    });
    test(("After creatin <span> with status should be displayed with correct status"),()=>{
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={()=>{}}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra");
    });
    test(("Input should be displayed in editMode instead of span"),()=>{
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={()=>{}}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra");
    });
    test(("CallBack should be called"),()=>{
        const mockCallBack = jest.fn();
        const component=create(<ProfileStatus status="it-kamasutra" updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        expect(mockCallBack.mock.calls.length).toBe(1);
    })
});



