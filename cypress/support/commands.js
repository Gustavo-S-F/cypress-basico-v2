Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    cy.get('#firstName').type('Gustavo',{delay:0})
    cy.get('#lastName').type('Silva Fernandes',{delay:0})
    cy.get('#email').type('gustavo.silva@gmail.com',{delay:0})
    cy.get('#phone').type('(55)998394893',{delay:0})
    cy.get('#open-text-area').type('i dont need help, thanks. Eu não preciso de ajuda, obrigado',{delay:0})
    cy.contains('.button','Enviar').click()
    cy.get('.success > strong').should('be.visible')
})

import 'cypress-xpath'
import 'xpath'
import 'iframe'
import 'cypress-iframe'