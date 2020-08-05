describe('Testing JS', function() {

    beforeEach(function() {
        $mealCost.value = 20;
        $tipAmt.value = 5;
        $serverName.value = "Maria";
    })

    it('should input vals and checkVal should return false', function() {
        expect(checkVal($inputs)).toBe(false);
    })

    


    afterEach(function() {
        $mealCost.value = '';
        $tipAmt.value = '';
        $serverName.value = '';
    })


})