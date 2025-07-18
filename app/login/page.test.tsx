import React from 'react'
import {test, expect, describe, } from 'vitest'
import {render, screen } from '@testing-library/react';
import LoginPage from './page'


describe('Login Page', ()=>{
    
    
    test('displays warning and input form labels',()=>{
        render(<LoginPage/>)
        expect(screen.getByText('You must be a valid user to login')).toBeInTheDocument()
        expect(screen.getByLabelText('Email:')).toBeInTheDocument()
        expect(screen.getByLabelText('Password:')).toBeInTheDocument()
        const loginButton = screen.getByRole('button', { name: /log in/i });
        expect(loginButton).toBeInTheDocument();
    })



   
})