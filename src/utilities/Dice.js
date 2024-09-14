export default class Dice {
    constructor() {
        this.randomRange = {min: 5, max: 10}

        this.rollingPath = [
            {
                face: 1,
                transformation: 'rotateX(0deg) rotateY(0deg)'
            }
        ]
    }

    getRandomRollingPath(score) {
        this._makeRandomPathFromZero()

        this._makePathToScore(score)

        return this.rollingPath
    }

    reset() {
        return {
            face: 1,
            transformation: 'rotateX(0deg) rotateY(0deg)'
        }
    }

    _makeRandomPathFromZero() {
        let turns = this._getNumberOfTurns()

        for (let turn = 0; turn <= turns; turn++) {
            this.rollingPath.push(this._getNearestFace(
                this.rollingPath[this.rollingPath.length - 1])
            )
        }
    }

    _getNumberOfTurns() {
        return Math.round(Math.random() * (this.randomRange.max - this.randomRange.min)) + this.randomRange.min
    }

    _makePathToScore(score) {
        let endFace = this.rollingPath[this.rollingPath.length - 1]

        if (endFace.face !== score) {
            let lastFace = endFace

            // eslint-disable-next-line for-direction,no-constant-condition
            while (true) {
                lastFace = this._getNearestFace(lastFace)

                this.rollingPath.push(lastFace)

                if (lastFace.face === score) {
                    break
                }
            }
        }
    }

    _getNearestFace(face) {
        let nearestNumbersForOneAndSix = [
            {
                face: 2,
                transformation: 'rotateX(-90deg) rotateY(0deg)'
            },
            {
                face: 3,
                transformation: 'rotateX(0deg) rotateY(90deg)'
            },
            {
                face: 4,
                transformation: 'rotateX(0deg) rotateY(-90deg)'
            },
            {
                face: 5,
                transformation: 'rotateX(90deg) rotateY(0deg)'
            }
        ]

        let nearestNumbersForTwoAndFive = [
            {
                face: 1,
                transformation: 'rotateX(0deg) rotateY(0deg)'
            },
            {
                face: 3,
                transformation: 'rotateX(0deg) rotateY(90deg)'
            },
            {
                face: 4,
                transformation: 'rotateX(0deg) rotateY(-90deg)'
            },
            {
                face: 6,
                transformation: 'rotateX(180deg) rotateY(0deg)'
            }
        ]

        let nearestNumbersForThreeAndFour = [
            {
                face: 1,
                transformation: 'rotateX(0deg) rotateY(0deg)'
            },
            {
                face: 2,
                transformation: 'rotateX(-90deg) rotateY(0deg)'
            },
            {
                face: 5,
                transformation: 'rotateX(90deg) rotateY(0deg)'
            },
            {
                face: 6,
                transformation: 'rotateX(180deg) rotateY(0deg)'
            }
        ]

        if (face.face === 1 || face.face === 6) {
            return nearestNumbersForOneAndSix[Math.floor(Math.random() * nearestNumbersForOneAndSix.length)]
        }

        if (face.face === 2 || face.face === 5) {
            return nearestNumbersForTwoAndFive[Math.floor(Math.random() * nearestNumbersForOneAndSix.length)]
        }

        if (face.face === 3 || face.face === 4) {
            return nearestNumbersForThreeAndFour[Math.floor(Math.random() * nearestNumbersForOneAndSix.length)]
        }
    }
}