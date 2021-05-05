import React from 'react'
import styled from 'styled-components'

function ThemeSwitcher() {
    return (
        <Style>
            <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
        </Style>
    )
}

const Style = styled.div`
margin-left: 1.7rem;
input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 4rem;
	height: 2rem;
	background: grey;
	display: block;
	border-radius: 100px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 5px;
	left: 5px;
	width: 1.45rem;
	height: 1.45rem;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label {
	background: #bada55;
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 130px;
}
`

export default ThemeSwitcher
