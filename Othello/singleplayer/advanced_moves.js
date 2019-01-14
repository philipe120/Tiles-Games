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
simturn = 1;
for(let j = 0; j <= 1; j++){ // number of moves forward

    // console.log(simgrid_main[0]);
    // console.log(simgrid_main[1]);

    if(j == 0){
        
        simgrid_main[0] = create_simgrid();
        simcoordinates_main[0] = analyse_simgrid(simgrid_main[0], simturn);

    }else if(j == 1){
        // something goes wrong here
        let k = 0;
        j = 1;
        simgrid_main[j] = {};
        // for(let k = 0; k < simcoordinates_main[j-1].length; k++){


        // click_simgrid
        simgrid_main[j][`${simcoordinates_main[j-1][k][0]},${simcoordinates_main[j-1][k][1]}`] = click_simgrid(simcoordinates_main[j-1][k][0], simcoordinates_main[j-1][k][1], simturn, simgrid_main[0]);
        
        // }
        console.log(simgrid_main);
    }
}


// console.log(simgrid_main);

// console.log(simcoordinates_main);






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