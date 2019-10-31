export default {
    nextPosition: null,
    getNextPosition(area, enemyMark) {
        this.nextPosition = null;
        window.console.log("getNextPosition");

        this.defense(area, enemyMark)
        window.console.log("afterDefence");

        if (this.nextPosition) {
            window.console.log("nextPos:", this.nextPosition)
            return this.nextPosition;
        }

        window.console.log("beforeSetFirst");
        this.setFirstEmpty(area);

        return this.nextPosition;
    },
    defense(area, enemyMark) {
        window.console.log("checkDiagonals");
        this.checkDiagonals(area, enemyMark);

        if (this.nextPosition) {
            return this.nextPosition;
        }

        window.console.log("checkHorizontals");
        this.checkHorizontals(area, enemyMark);

        if (this.nextPosition) {
            return this.nextPosition;
        }

        window.console.log("checkVerticals");
        this.checkVerticals(area, enemyMark);

        if (this.nextPosition) {
            return this.nextPosition;
        }
    },
    checkHorizontals(area, enemyMark) {
        var count = 0;
        var emptySlot = null;

        for (var v = 0; v < 3; v++) {
            count = 0;
            for (var h = 0; h < 3; h++) {
                if (area[v][h] === enemyMark) {
                    count++;
                }

                if (!area[v][h]) {
                    emptySlot = h;
                }
            }

            if (count === 2 && emptySlot) {
                this.nextPosition = {
                    posV: v,
                    posH: emptySlot,
                }

                return;
            }
        }
    },
    checkVerticals(area, enemyMark) {
        // debugger; // eslint-disable-line
        var count = 0;
        var emptySlot = null;

        for (var h = 0; h < 3; h++) {
            count = 0;
            for (var v = 0; v < 3; v++) {
                if (area[v][h] === enemyMark) {
                    count++;
                }

                if (!area[v][h]) {
                    emptySlot = v;
                }
            }

            if (count === 2 && emptySlot) {
                this.nextPosition = {
                    posV: emptySlot,
                    posH: h,
                }

                return;
            }
        }
    },
    checkDiagonals(area, enemyMark) {
        var count = 0;
        var emptySlot = null;

        for (var i = 0; i < 3; i++) {
            if (area[i][i] === enemyMark) {
                count++;
            }

            if (!area[i][i]) {
                emptySlot = i;
            }
        }

        if (count === 2 && emptySlot) {
            this.nextPosition = {
                posV: emptySlot,
                posH: emptySlot,
            }

            return;
        }

        var h = 2;
        var emptySlotH = null;
        var emptySlotV = null;
        count = 0;

        for (var v = 0; v < 3; v++) {
            if (area[v][h] === enemyMark) {
                count++;
            }

            if (!area[v][h]) {
                emptySlotH = h;
                emptySlotV = v;
            }

            h--;
        }

        if (count === 2 && emptySlotH && emptySlotV) {
            this.nextPosition = {
                posV: emptySlotV,
                posH: emptySlotH,
            }

            return;
        }
    },
    setFirstEmpty(area) {
        window.console.log("serFirstEmptyStart, areValue:", area)
        for (var v = 0; v < 3; v++) {
            for (var h = 0; h < 3; h++) {
                if (!area[v][h]) {
                    this.nextPosition = {
                        posV: v,
                        posH: h,
                    }

                    return;
                }
            }
        }
    }
}