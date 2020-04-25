import React, { useState } from 'react';

import { Tag, VARIANT as TAG_VARIANT } from 'baseui/tag';
import { Button } from 'baseui/button';

import { connect, useDispatch } from 'react-redux';
import { showSkills } from '../store/actions'
import { useStyletron } from 'baseui';



const Some = ({ children }) => {

    const [css] = useStyletron();
    return (
        <div
            className={css({
                flex: '1 1 0%',
                flexWrap: 'wrap',
                display: 'flex',
                alignItems: 'center',
            })}
        >
            {children}
        </div>
    )
}

const DisplaySkills = ({ skillsDataItems }) => {
   
    const { skillsTags } = skillsDataItems;

    return (
        <Some>
            {skillsTags ? 
                skillsTags.map((tag, index) => (
                    <Tag
                        closeable={false}
                        variant={TAG_VARIANT.solid}
                        key={index}
                    >
                        {tag}
                    </Tag>
                ))
             : console.log('nope')}
        </Some>
    )
}

const mapState = state => ({
    skillsDataItems: state.basicInfo.skillsDataItems
})

const mapDispatch = (dispatch) => {
    dispatch(showSkills())
    return {

    }
}

export default connect(mapState, mapDispatch)(DisplaySkills);
