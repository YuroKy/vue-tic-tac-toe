export default {
    botMark: null,
    humanMark: null,
    setMarks(botMark, humanMark) {
        this.botMark = botMark;
        this.humanMark = humanMark;
    },
    emptyIndices(area) {
        var positions = [];
        for (var v = 0; v < 3; v++) {
            for (var h = 0; h < 3; h++) {
                if (!area[v][h]) {
                    positions.push({
                        posV: v,
                        posH: h,
                    })
                }
            }
        }

        return positions;
    },
    winning(area, mark) {
        if (
            (area[0][0] === mark && area[0][1] === mark && area[0][2] === mark) ||
            (area[1][0] === mark && area[1][1] === mark && area[1][2] === mark) ||
            (area[2][0] === mark && area[2][1] === mark && area[2][2] === mark) ||
            (area[0][0] === mark && area[1][0] === mark && area[2][0] === mark) ||
            (area[0][1] === mark && area[1][1] === mark && area[2][1] === mark) ||
            (area[0][2] === mark && area[1][2] === mark && area[2][2] === mark) ||
            (area[0][0] === mark && area[1][1] === mark && area[2][2] === mark) ||
            (area[0][2] === mark && area[1][1] === mark && area[2][0] === mark)
        ) {
            return true;
        }
        else {
            return false;
        }
    },
    minimax(newArea, mark) {
        // debugger; // eslint-disable-line
        var availablePositions = this.emptyIndices(newArea);

        if (this.winning(newArea, this.humanMark)) {
            return { score: -10 };
        }
        else if (this.winning(newArea, this.botMark)) {
            return { score: 10 };
        }
        else if (availablePositions.length === 0) {
            return { score: 0 };
        }

        var moves = [];

        for (let i = 0; i < availablePositions.length; i++) {
            var position = availablePositions[i];
            var move = {};
            move.position = position;
            move.index = newArea[position.posV][position.posH];

            newArea[position.posV][position.posH] = mark;
            if (mark == this.botMark) {
                let result = this.minimax(newArea, this.humanMark);
                move.score = result.score;
            }
            else {
                let result = this.minimax(newArea, this.botMark);
                move.score = result.score;
            }

            newArea[position.posV][position.posH] = move.index;
            moves.push(move);
        }

        var bestMove;

        if (mark === this.botMark) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    },
    getNextMove(area, player) {
        return this.minimax(area, player).position;
    }
}