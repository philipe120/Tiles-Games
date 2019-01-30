simgrid_main = [];
// simgrid = [[["grey","grey",etc.],["grey","grey",etc.],etc.],[]]
// first dimension stores different simgrids, with even for friend, odd player
/* for second and more items, the second and more dimensions are used to specify 
which coordinates has been chosen */

// coordinates will be stored in string form, '[1,2]',


simcoordinates_main = [];
// [[](possible moves of this grid), [[](possible moves of this grid)](coordinate of possible move)]
// it stores every single posibile move




simpoints_main = [];
// [[],[]]
// stores points for every single posibile moves, follow simcoordinates_main

simturn = 1;



// store stuff for hard difficulty

function bestmove(){
/*
"think ahead" four steps, then choose most valuable move

tips and trick?
*/

// we want to get pieces to be stable?

simgrid_main = [];

for(let j = 0; j <= 3; j++){ // number of moves forward
    let simturn = j+turn;

    if(j == 0){
        
        simgrid_main[0] = create_simgrid();
        simcoordinates_main[0] = analyse_simgrid(simgrid_main[0], simturn);

    }else{

        simgrid_main[j] = {};
        simcoordinates_main[j] = {};

        for(let k = 0; k < simcoordinates_main[0].length; k++){

            let x = simcoordinates_main[0][k][0];
            let y = simcoordinates_main[0][k][1];

            if (j == 1){
                let grid = JSON.parse(JSON.stringify(simgrid_main[0]));
                simgrid_main[j][`${x},${y}`] = click_simgrid(x, y, simturn-1, grid);
                simcoordinates_main[j][`${x},${y}`] = analyse_simgrid(simgrid_main[j][`${x},${y}`], simturn);
            }else{

                simgrid_main[j][`${x},${y}`] = {};
                simcoordinates_main[j][`${x},${y}`] = {};

                for (let l = 0; l < simcoordinates_main[1][`${x},${y}`].length; l++){

                    let a = simcoordinates_main[1][`${x},${y}`][l][0];
                    let b = simcoordinates_main[1][`${x},${y}`][l][1];

                    if (j == 2){
                        let grid = JSON.parse(JSON.stringify(simgrid_main[1][`${x},${y}`]));
                        simgrid_main[j][`${x},${y}`][`${a},${b}`] = click_simgrid(a, b, simturn-1, grid);
                        simcoordinates_main[j][`${x},${y}`][`${a},${b}`] = analyse_simgrid(simgrid_main[j][`${x},${y}`][`${a},${b}`], simturn);
                    }else{

                        simgrid_main[j][`${x},${y}`][`${a},${b}`] = {};
                        simcoordinates_main[j][`${x},${y}`][`${a},${b}`] = {};

                        for (let m = 0; m < simcoordinates_main[2][`${x},${y}`][`${a},${b}`].length; m++){                            

                            let c = simcoordinates_main[2][`${x},${y}`][`${a},${b}`][m][0];
                            let d = simcoordinates_main[2][`${x},${y}`][`${a},${b}`][m][1];

                            if (j == 3){
                                let grid = JSON.parse(JSON.stringify(simgrid_main[2][`${x},${y}`][`${a},${b}`]));
                                simgrid_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`] = click_simgrid(c, d, simturn-1, grid);
                                simcoordinates_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`] = analyse_simgrid(simgrid_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`], simturn);
                            }else{

                                simgrid_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`] = {};
                                simcoordinates_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`] = {};

                                for (let n = 0; n < simcoordinates_main[j-1][`${x},${y}`][`${a},${b}`][`${c},${d}`].length; n++){

                                    let e = simcoordinates_main[3][`${x},${y}`][`${a},${b}`][`${c},${d}`][n][0];
                                    let f = simcoordinates_main[3][`${x},${y}`][`${a},${b}`][`${c},${d}`][n][1];

                                    if (j == 4){
                                        let grid = JSON.parse(JSON.stringify(simgrid_main[3][`${x},${y}`][`${a},${b}`][`${c},${d}`]));
                                        simgrid_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`][`${e},${f}`] = click_simgrid(e, f, simturn-1, grid);
                                        simcoordinates_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`][`${e},${f}`] = analyse_simgrid(simgrid_main[j][`${x},${y}`][`${a},${b}`][`${c},${d}`][`${e},${f}`], simturn);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

console.log(simgrid_main);
console.log(simcoordinates_main);
console.log(simpoints_main);





// console.log(analyse_simgrid(simgrid,turn));

// click_simgrid(a, b, turn);
}

function create_simgrid(){
    let simgrid = [];
    for (let x = 1; x <= 8; x++){
        simgrid[x] = [];
        for (let y = 1; y <= 8; y++){
            let element = document.getElementById(`row${x},column${y}`);
            element.classList.remove("white_hover");
            element.classList.remove("black_hover");
            simgrid[x][y] = element.className;
        }
    }    
    return simgrid;
}