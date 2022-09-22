/// <reference types="Cypress"/>

describe('Central de Atendimento TAT', () => {
 const three_seconds_in_ms=3000

  
  beforeEach(() => {
    cy.visit("../src/index.html")
   // cy.visit("https://appstoreconnect.apple.com/login")
  })

  it('verifica o titulo da aplicação', () => {
    cy.get("#title").should('be.visible')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Gustavo', { delay: 0 })
    cy.get('#lastName').type('Silva Fernandes', { delay: 0 })
    cy.get('#email').type('gustavo.silva@gmail.com', { delay: 0 })
    cy.get('#phone').type('(55)998394893', { delay: 0 })
    cy.get('#open-text-area').type('i dont need help, thanks. Eu não preciso de ajuda, obrigado', { delay: 0 })
    cy.contains('.button', 'Enviar').click()
    cy.get('.success > strong').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Gustavo', { delay: 0 })
    cy.get('#lastName').type('Silva Fernandes', { delay: 0 })
    cy.get('#email').type('gustavo.silvagmail.com', { delay: 0 })
    cy.get('#phone').type('(55)998394893', { delay: 0 })
    cy.get('#open-text-area').type('i dont need help, thanks. Eu não preciso de ajuda, obrigado', { delay: 0 })
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('valida que ao digitar texto no campo de telefone o mesmo continua vazio', () => {
    cy.get('#phone')
      .type('test fild value', { delay: 0 })
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Gustavo', { delay: 0 })
    cy.get('#lastName').type('Silva Fernandes', { delay: 0 })
    cy.get('#email').type('gustavo.silva@gmail.com', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('i dont need help, thanks. Eu não preciso de ajuda, obrigado', { delay: 0 })
    cy.contains('.button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
    cy.tick(three_seconds_in_ms)
    cy.get('.error > strong').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Gustavo', { delay: 0 }).should('have.value', 'Gustavo').clear().should('have.value', '')
    cy.get('#lastName').type('Silva Fernandes', { delay: 0 }).should('have.value', 'Silva Fernandes').clear().should('have.value', '')
    cy.get('#email').type('gustavo.silva@gmail.com', { delay: 0 }).should('have.value', 'gustavo.silva@gmail.com').clear().should('have.value', '')
    cy.get('#phon').type('(55)998394893', { delay: 0 }).should('have.value', '55998394893').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('envia formulário com sucesso usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select[id="product"]')
      .select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select[id="product"]')
      .select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select[id="product"]')
      .select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
      cy.wrap($radio).check()
        .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"][value="email"]').check()
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('input[type="checkbox"][value="phone"]').uncheck()
    cy.get('input[type="checkbox"]').last().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@samplefile', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
    cy.get('a[href="privacy.html"]').should('have.attr','target','_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })

  /*it('teste pedro',()=>{

    cy.wait(3000)
    cy.xpath('/html/body/div[3]/apple-auth/div/div[1]/div/sign-in/div/div[1]/div[1]/div/div/div[1]/div/div/input')
    .dblclick({force:true}).clear().type('teste')
    //cy.get('input[type="text"]')
    //cy.get('#aid-auth-widget-iFrame').invoke('removeAttr','#aid-auth-widget-iFrame' )
    //cy.get('#account_name_text_field').type('teste')
  })*/

 

})
