const inquirer = require('inquirer');
const superagent = require('superagent');

const cli = require('../lib/cli');

const houseMenu = require('../lib/menus/houses');
const actionsHouse = require('../lib/menus/houses/actions');
const actionsActionHouse = require('../lib/menus/houses/actions/list');
const housesFixture = require('../test/fixtures/houses');

jest.mock('inquirer');
jest.mock('superagent');

function getSuperagentMock(response) {
    superagent.get.mockResolvedValue(response);
}

describe('Validar o menu Houses', () => {
    describe('Exibir opção de listar as casas do mundo de Game of Thrones', () => {
        let choicesMenu = [];

        beforeEach(() => {
            jest.clearAllMocks();
            console.log = jest.fn()
        })

        afterEach(() => {
            jest.clearAllMocks();
        })

        test('verificar se existe a opcao "casas" no menu inicial', async () => {
            inquirer.prompt.mockResolvedValueOnce({})
            await cli.run({})
            choicesMenu = inquirer.prompt.mock.calls[0][0].choices.map(({ name }) => name);
            expect(choicesMenu).toContain('Casas');
        });

        test('Ao selecionar casas verificar se existe a opcao "listar casas"', async () => {
            inquirer.prompt.mockResolvedValueOnce({})
            houseMenu.run(jest.fn());
            choicesMenu = inquirer.prompt.mock.calls[0][0].choices.map(({ name }) => name);
            expect(choicesMenu).toContain('Listar casas');
        });


        test('Verificar a opcao "Próxima página"', async () => {
            getSuperagentMock(housesFixture.responses.hasNext);
            superagent.get.mockResolvedValueOnce(housesFixture.responses.hasNext)
                .mockResolvedValueOnce(housesFixture.responses.hasPrevious);

            inquirer.prompt.mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: question.choices[0].value })
            }).mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: 'back' })
            }).mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: 'prev' })
            })

            await actionsActionHouse.run(jest.fn());
            choicesMenu = inquirer.prompt.mock.calls[0][0].choices.map(({ name }) => name).filter(Boolean);
            expect(choicesMenu).toContain('Próxima página');
            expect(choicesMenu).toContain('Voltar para o menu anterior');
        });


        test('Verificar a opcao "Página anterior" quando vou para proxima pagina', async () => {
            getSuperagentMock(housesFixture.responses.hasNext);
            superagent.get.mockResolvedValueOnce(housesFixture.responses.hasNext)
                .mockResolvedValueOnce(housesFixture.responses.hasPrevious);

            inquirer.prompt.mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: question.choices[0].value })
            }).mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: 'back' })
            }).mockImplementationOnce((questions) => {
                const question = Array.isArray(questions) ? questions[0] : questions;
                return Promise.resolve({ [question.name]: 'back' })
            })

            await actionsActionHouse.run(jest.fn());
            choicesMenu = inquirer.prompt.mock.calls[0][0].choices.map(({ name }) => name).filter(Boolean);
            expect(choicesMenu).toContain('Página anterior');
            expect(choicesMenu).toContain('Voltar para o menu anterior');
        });
    });
});
