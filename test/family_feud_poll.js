const FamilyFeudPoll = artifacts.require('FamilyFeudPoll')

contract('FamilyFeudPoll', function (accounts) {
  const [owner, person1, person2, person3 ] = accounts

  let familyFeudPoll

  beforeEach(async () => {
    familyFeudPoll = await FamilyFeudPoll.new()
  })

  it('should assert true', async function () {
    return assert.isTrue(true)
  })

  context('submitting a question', () => {
    it('should allow owner to submit a question', async () => {
      const mockQuestion = 'question...'

      await familyFeudPoll.submitQuestion(mockQuestion)

      const actualQuestionStrings = await familyFeudPoll.getQuestionStrings()

      const actualQuestionIds = await familyFeudPoll.getQuestionIds()

      const expectedQuestionStrings = ['', mockQuestion]

      const expectedQuestionIds = [web3.utils.toBN(0), web3.utils.toBN(1)];

      expect(actualQuestionStrings).to.deep.equal(expectedQuestionStrings)

      expect(actualQuestionIds).to.deep.equal(expectedQuestionIds)
    })

    it('reverts when non-owner tries to submit a question', () => {})
  })

  context('submitting an answer', () => {
    
    it('2 people can submit same answer, and a third person submits a different answer', async () => {
      
      const mockAnswer1 = 'this is answer 1'
      const mockAnswer2 = 'this is answer 2'

      const mockQuestionId = 1

      await familyFeudPoll.submitAnswer(mockQuestionId, mockAnswer1, { from: person1 });

      await familyFeudPoll.submitAnswer(mockQuestionId, mockAnswer1, { from: person2 });

      await familyFeudPoll.submitAnswer(mockQuestionId, mockAnswer2, { from: person3 });

      const actualQuestionStats = await familyFeudPoll.getQuestionStats(
        mockQuestionId
      )

      const expectedQuestionStats = {
        '0': ['', mockAnswer1, mockAnswer2],
        '1': [web3.utils.toBN(0), web3.utils.toBN(2), web3.utils.toBN(1)],
      }

      expect(actualQuestionStats).to.deep.equal(expectedQuestionStats);
      
    });

  })
})
