class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null)
            throw new Error;
        else
        {
            this._config = config;
            this._state = config.initial;
            this._history = [];
            this._history.push(this._state);
            this._index = 0;
        }
    }
 
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }
 
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (var key in this._config.states)
        {
            if (key == state)
            {
                this._state = key;
                this._history = this._history.slice(0, this._index + 1);
                this._history.push(this._state);
                this._index++;
                return 1;
            }
        }
        throw new Error;
    }
 
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for (var key in this._config.states[this._state].transitions)
        {
            if (key == event)
            {
                this._state = this._config.states[this._state].transitions[key];
                this._history = this._history.slice(0, this._index + 1);
                this._history.push(this._state);
                this._index++;
                return 1;
            }
        }
        throw new Error;
    }
 
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._config.initial;
        this._history.push(this._state);
        this._index++;
    }
 
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var result = [];
        if (event == null)
        {
            for (var state in this._config.states)
                result.push(state);
            return result;
        }
        for (var state in this._config.states)
        {
            for (var transition in this._config.states[state].transitions)
                if (transition == event)
                    result.push(state);
        }
        return result;
    }
 
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._index == 0)
            return false;
        this._state = this._history[this._index - 1];
        this._index--;
        return true;
    }
 
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._index == this._history.length - 1)
            return false;
        this._state = this._history[this._index + 1];
        this._index++;
        return true;
    }
 
    /**
     * Clears transition history
     */
    clearHistory() {
        this._history = []
        this._history.push(this._state);
        this._index = 0;
    }
}
 
module.exports = FSM;

/** @Created by Uladzimir Halushka **/
