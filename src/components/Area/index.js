// import ai from './../../services/AI.js'
import ai from './../../services/hardAI.js'

const both = 'both';

export default {
    data: function () {
        return {
            step: 1,
            round: 1,
            winner: '',
            playerMakeMoveFirst: true,
            area: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            marks: ['wolf', 'eagle'],
            player: {
                mark: '',
            },
            bot: {
                mark: '',
            }
        }
    },
    computed: {
        winnerText() {
            return this.winner === 'wolf' ? 'Угров: Одінокий вовк'
                : this.winner === 'eagle' ? 'Угров: Молодий орел'
                    : both ? 'Пацани так і не рішили ко угров))00)'
                        : 'ХЗ ко угров бо шось ся поламало((((((((';
        }
    },
    methods: {
        choseMarks(mark) {
            this.player.mark = mark;
            this.bot.mark = this.marks.find(m => m != mark);
            ai.setMarks(this.bot.mark, this.player.mark);
            this.step++;

            if (!this.playerMakeMoveFirst) {
                this.botMove();
            }
        },
        makeMove(posV, posH) {
            if (this.area[posV][posH]) {
                this.$bvToast.toast(`Еееее хлопче, дурноє робиш!!!`, {
                    title: 'Йой, шось ся стало :С',
                    autoHideDelay: 5000,
                    appendToast: false,
                })
                return;
            }

            this.$set(this.area[posV], posH, this.player.mark);
            this.checkGameStatus()
            this.botMove();
            this.checkGameStatus();
            this.round++;
        },
        botMove() {
            window.console.log('beforeAi');
            var pos = ai.getNextMove(this.area, this.bot.mark, this.player.mark);
            window.console.log('afterAi');
            window.console.log(pos);
            this.$set(this.area[pos.posV], pos.posH, this.bot.mark);
            this.round++;
        },
        checkGameStatus() {
            if (ai.winning(this.area, this.player.mark)) {
                this.step++;
                this.winner = this.player.mark;
            }

            if (ai.winning(this.area, this.bot.mark)) {
                this.step++;
                this.winner = this.bot.mark;
            }

            var emptyCount = 9;
            for (var v = 0; v < 3; v++) {
                for (var h = 0; h < 3; h++) {
                    if (this.area[h][v]) {
                        emptyCount--;
                    }
                }
            }

            if (emptyCount === 0) {
                this.step++;
                this.winner = both;
            }
        },
        newGame() {
            location.reload();
        }
    },
}
