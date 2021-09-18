// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract FamilyFeudPoll {
    string[] public questionStrings = [""];
    uint256[] public questionIds = [0];

    uint256 nextQuestionIndex = 1;

    address[] public callers;

    mapping(uint256 => string[]) answers;
    mapping(uint256 => uint256[]) answerCount;

    // questionId    // answer // index
    mapping(uint256 => mapping(string => uint256)) answerToIndex;

    mapping(uint256 => uint256) nextAnswerIndex;

    function submitQuestion(string calldata question) external {
        questionStrings.push(question);
        questionIds.push(nextQuestionIndex);

        nextQuestionIndex++;

        callers.push(msg.sender);
    }

    function getQuestionStrings() external view returns (string[] memory) {
        return questionStrings;
    }

    function getQuestionIds() external view returns (uint256[] memory) {
        return questionIds;
    }

    function submitAnswer(uint256 questionId, string calldata answer) external {
        uint256 answerIndex = answerToIndex[questionId][answer];

        if (nextAnswerIndex[questionId] == 0) {
            answers[questionId].push("");
            answerCount[questionId].push(0);
            nextAnswerIndex[questionId]++;
        }

        if (answerIndex == 0) {
            answers[questionId].push(answer);
            answerCount[questionId].push(1);
            
            answerToIndex[questionId][answer] = nextAnswerIndex[questionId];

            nextAnswerIndex[questionId]++;
        }
        else {
          answerCount[questionId][answerIndex]++;
        } 

    }

    function getQuestionStats(uint256 questionId)
        external
        view
        returns (string[] memory, uint256[] memory)
    {
      return (
        answers[questionId],
        answerCount[questionId]
      );
    }
}
